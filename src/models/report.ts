import {DataTypes, Model, Optional} from 'sequelize'
import ReportAttributes from '../models/Interface/reportAttributes'
import sequelize from '../database/db'

type reportCreationAttributes = Optional<ReportAttributes, 'id_report'>

class Report
  extends Model<ReportAttributes, reportCreationAttributes>
  implements ReportAttributes
{
  declare id_report: number
  declare generated_by_user: string
  declare type: string
  declare report_data: any
  declare createdAt: Date
  declare updatedAt: Date
}

Report.init(
  {
    id_report: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    generated_by_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    report_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Reports',
    timestamps: true,
    underscored: true,
  },
)

export default Report
