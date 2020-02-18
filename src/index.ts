import fetch from 'node-fetch';

import * as db from './util/db';
import TimeseriesModel from './timeseries/timeseries.model';

const outlierUrl = process.env.OUTLIER_API_URL;

interface ITimeseries {
  date: Date;
  location: string;
  value: number;
  country: string;
}

const parseCsv = (data: string, country: string): ITimeseries[] => {
  const timeseries = data.split('\n');
  // remove the columns name
  timeseries.shift();
  // remove empty rows
  return timeseries.filter(i => i).map((ts: string) => {
    const cols = ts.split(',');
    const date = new Date(cols[0]);
    // remove useless ""
    const location = cols[1].replace('"', '');
    const value = parseInt(cols[cols.length - 1]);

    return {
      date,
      value,
      location,
      country
    };
  });
};

const getCsv = async (csv: string): Promise<string> => {
  const response = await fetch(`${outlierUrl}/${csv}`);
  const data = await response.text();
  return data;
};

const main = async () => {
  try {
    console.log('Connecting the database...');
    await db.init();

    console.log('Downloading csv files...');
    const [rawAustralia, rawFrance, rawUsa] = await Promise.all([
      getCsv('australia.csv'),
      getCsv('france.csv'),
      getCsv('usa.csv'),
    ]);

    console.log('Parsing csv files...');
    const australia = parseCsv(rawAustralia, 'australia');
    const france = parseCsv(rawFrance, 'france');
    const usa = parseCsv(rawUsa, 'usa');

    console.log('Adding data to the db...');
    await TimeseriesModel.bulkCreate([...australia, ...france, ...usa]);
  } catch (err) {
    console.error(err);
  } finally {
    await db.sequelize.close();
    console.log('Db connection closed, goodbye');
  }
};

const shutdown = async () => {
  console.log('Stop signal catched. Closing connections...');

  await db.sequelize.close();

  console.info('Connection closed: terminating.');
  process.exit(1);
};

main();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
