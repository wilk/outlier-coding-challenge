import { Model, DataTypes } from 'sequelize';
import * as db from '../util/db';

class TimeseriesModel extends Model {
  public id!: number;
  public date!: Date;
  public location!: string;
  public value!: number;
  public country!: string;
}

TimeseriesModel.init({
  id: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  location: {
    allowNull: false,
    type: DataTypes.STRING(300)
  },
  value: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING(130)
  },
}, {
    sequelize: db.sequelize,
    tableName: 'timeseries',
  });

export default TimeseriesModel;
