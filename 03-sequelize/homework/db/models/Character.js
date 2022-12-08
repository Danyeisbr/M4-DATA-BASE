const { DataTypes } = require('sequelize');

/* module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
          },
    name: {
      type: DataTypes.STRING,
      ununique: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,      
    },
    race:{
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other',
    },
    hp:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mana:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      
    }, 
    
    
  },
  {timestamps: false})
  
} */

module.exports = sequelize => {
  sequelize.define('Character', {
    
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    
    age: {
      type: DataTypes.INTEGER,
      get() {
        const olderCharacter = this.getDataValue('age');
        return olderCharacter ? `${olderCharacter} years old`: null;
      }
    },
    
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
    
      defaultValue: 'Other',
    },
    
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    date_added: {
      type: DataTypes.DATEONLY, //valor
      defaultValue: DataTypes.NOW,
      //valor de la hora actual
    },
  
  },
  {
    timestamps: false,
  }  
  );
};

/* 
code*: string (Máximo 5 caracteres) [PK]
name*: string (Debe ser único)
age: integer
race: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
hp*: float
mana*: float
date_added: timestamp without time */