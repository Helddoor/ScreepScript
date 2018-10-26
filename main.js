var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMeleeAttack = require('role.meleeAttacker');
var towerDef = require('role.tower');
var roleRanger = require('role.ranger');
require('prototype.spawn')();

module.exports.loop = function () {
  /*
  //Führt alle 10 Ticks aus
  Game.spawns.Spawn1.memory.TicksToWaitForStatus = Game.spawns.Spawn1.memory.TicksToWaitForStatus-1;

  if(Game.spawns.Spawn1.memory.TicksToWaitForStatus <= 0){
    Game.spawns.Spawn1.memory.TicksToWaitForStatus = 10;
  }*/

  //Delete Memory
  for (let name in Memory.creeps) {
  // and checking if the creep is still alive
      if (Game.creeps[name] == undefined) {
           // if not, delete the memory entry
          delete Memory.creeps[name];
      }
  }

  //Towers
  for(let name in Game.rooms) {
	   towerDef.run(name);
  }

  //run creep
  for(let name in Game.creeps) {
    let creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }
    else if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }
    else if(creep.memory.role == 'builder') {
        roleBuilder.run(creep);
    }
    else if(creep.memory.role == 'meleeAttacker') {
        roleMeleeAttack.run(creep);
    }
    else if (creep.memory.role == 'ranger') {
        roleRanger.run(creep);
    }
  }

//new script
if(false){ //temp
//Set Minimum creeps
Game.spawns.Spawn1.setMinRoles(5, 4, 2, 0, 0);

//Run thorugh all Spawns
  for(let currentSpawn in Game.spawns){
    //Run Creeps
    for(let name in Game.creeps) {
      let creep = Game.creeps[name];
      if(creep.memory.role == 'harvester') {
          roleHarvester.run(creep);
      }
      else if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
      }
      else if(creep.memory.role == 'builder') {
          roleBuilder.run(creep);
      }
      else if(creep.memory.role == 'meleeAttacker') {
          roleMeleeAttack.run(creep);
      }
      else if (creep.memory.role == 'ranger') {
          roleRanger.run(creep);
      }
    }

    Game.spawns[currentSpawn].currentSpawnCreepsAndEnergy();

    //Energy
    Game.spawns[currentSpawn].memory.currentEnergy = Game.spawns[currentSpawn].room.energyAvailable;
    Game.spawns[currentSpawn].room.visual.text(
      'Energy: ' + Math.round(Game.spawns.Spawn1.memory.currentEnergy / Game.spawns[currentSpawn].room.energyCapacityAvailable * 100) + "%",
      Game.spawns[currentSpawn].pos.x-2,
      Game.spawns[currentSpawn].pos.y - 1.25,
      {align: 'left', opacity: 0.8});

    //Respawn Creeps if insufficient
    if(Game.spawns["Spawn1"].memory.currentCreepAmount < Game.spawns["Spawnn1"].memory.numberOfSetMinimumCreeps){

      if(Game.spawns[currentSpawnTemp].memory.currentHarvesters) {
        Game.spawns[currentSpawn].spawnHarvester(currentSpawn, 200);
      }
      else if(Game.spawns[currentSpawnTemp].memory.currentUpgrader) {

      }
      else if(Game.spawns[currentSpawnTemp].memory.currentBuilder) {

      }
      else if(Game.spawns[currentSpawnTemp].memory.currentMeleeAttacker) {

      }
      else if(Game.spawns[currentSpawnTemp].memory.currentRanger) {

      }

    }

  }

}


  var requiredEnergyToSpawn = 300;
  var numberOfMinimumHarvesters = 3;
  var numberOfMinimumUpgraders = 2;
  var numberOfMinimumBuilder  = 4;
  var numberOfMinimumMeleeAttacker  = 0;
  var numberOfMinimumRanger = 0;


  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var meleeAttacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker');
  var ranger = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranger');

  if(Game.spawns.Spawn1.room.energyAvailable  >= requiredEnergyToSpawn) {

       if(harvesters.length < numberOfMinimumHarvesters) {
          var newName = 'Harvester' + Game.time;
          //console.log('Spawning new harvester: ' + newName);
          Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'harvester', harvesting: false, moving: true, target: null}});
      }
      else if(upgrader.length < numberOfMinimumUpgraders) {
          var newName = 'Upgrader' + Game.time;
          //console.log('Spawning new upgrader: ' + newName);
          Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'upgrader', harvesting: false, moving: true, target: null}});
      }
      else if(builder.length < numberOfMinimumBuilder) {
          var newName = 'Builder' + Game.time;
          //console.log('Spawning new builder: ' + newName);
          Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'builder', harvesting: false, moving: true, repair_: false, target: null}});
      }
       else if(meleeAttacker.length < numberOfMinimumMeleeAttacker) {
          var newName = 'MeleeAttacker' + Game.time;
          //console.log('Spawning new meleeAttacker: ' + newName);
          Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, MOVE], newName,
          {memory: {role: 'meleeAttacker', moving: true, target: null}});
      }
      else if(ranger.length < numberOfMinimumRanger) {
		//Zusatzbedingung
		if(Game.spawns['Spawn1'].room.energyAvailable > Game.spawns['Spawn1'].room.energyCapacityAvailable - 100) {
			var newName = 'Ranger' + Game.time;
			//console.log('Spawning new blocker: ' + newName);
			Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE], newName,
			{memory: {role: 'ranger', moving: true, target: null}});
		}
      }

  }


}
