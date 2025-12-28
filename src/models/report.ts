import {DataTypes, Model, Optional} from 'sequelize'
import ReportAttributes from './Interface/reportAttributes'
import sequelize from '../database/db'
type reportCreationAttributes = Optional<ReportAttributes, 'id_report'>

class Report
  extends Model<ReportAttributes, reportCreationAttributes>
  implements ReportAttributes
{
  declare id_report: number
  declare generated_by_user: string
}
Report.init(
  {
    id_report: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    generated_by_user: {
      type: DataTypes.STRING,
      allowNull: false,
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
