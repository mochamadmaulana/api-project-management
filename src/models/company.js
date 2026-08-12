const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define('Company', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'companies',
		timestamps: true,
		paranoid: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',

		scopes: {
			onlyDeleted: {
				paranoid: false,
				where: {
					deleted_at: {
						[Op.not]: null
					}
				}
			}
		}
	});

	Company.associate = (models) => {
		Company.hasMany(models.User, {
			foreignKey: 'company_id',
			as: 'companies'
		});
	};

	return Company;
}