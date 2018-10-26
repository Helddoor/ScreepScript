var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMeleeAttack = require('role.meleeAttacker');
var towerDef = require('role.tower');
var roleRanger = require('role.ranger');
require('prototype.spawn')();

module.exports.loop = function () {
  Game.spawns["Spawn1"].currentSpawnCreepsAndEnergy();

  //Führt alle 10 Ticks aus
  Game.spawns.Spawn1.memory.TicksToWaitForStatus = Game.spawns.Spawn1.memory.TicksToWaitForStatus-1;
  if(Game.spawns.Spawn1.memory.TicksToWaitForStatus <= 0){

    //Delete Memory
    for (let name in Memory.creeps) {
    // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
             // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    //Set Minimum creeps
    Game.spawns.Spawn1.setMinRoles(4, 4, 3, 0, 0);

    Game.spawns.Spawn1.memory.TicksToWaitForStatus = 10;
  }

  //Towers
  for(let name in Game.rooms) {
	   towerDef.run(name);
  }

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

    //Info about Spawn and its Energy
    if(Game.spawns.Spawn1.memory.TicksToWaitForStatus <= 0){
      Game.spawns[currentSpawn].currentSpawnCreepsAndEnergy();
    }

    //Energy
    Game.spawns[currentSpawn].memory.currentEnergy = Game.spawns[currentSpawn].room.energyAvailable;
    Game.spawns[currentSpawn].room.visual.text(
      'Energy: ' + Math.round(Game.spawns.Spawn1.memory.currentEnergy / Game.spawns[currentSpawn].room.energyCapacityAvailable * 100) + "%",
      Game.spawns[currentSpawn].pos.x-2,
      Game.spawns[currentSpawn].pos.y - 1.25,
      {align: 'left', opacity: 0.8});

    //Respawn Creeps if insufficient
    if(Game.spawns[currentSpawn].memory.currentCreepAmount < Game.spawns[currentSpawn].memory.numberOfSetMinimumCreeps){

      if(Game.spawns[currentSpawn].memory.currentHarvesters) {
        Game.spawns[currentSpawn].spawnHarvester(currentSpawn, 550);
      }
      else if(Game.spawns[currentSpawn].memory.currentUpgrader) {
        Game.spawns[currentSpawn].spawnUpgrader()(currentSpawn, 550);
      }
      else if(Game.spawns[currentSpawn].memory.currentBuilder) {
        Game.spawns[currentSpawn].spawnBuilder()()(currentSpawn, 550);
      }
      else if(Game.spawns[currentSpawn].memory.currentMeleeAttacker) {
        Game.spawns[currentSpawn].spawnMeleeAttacker()()(currentSpawn, 500);
      }
      else if(Game.spawns[currentSpawn].memory.currentRanger) {
        Game.spawns[currentSpawn].spawnRanger()()(currentSpawn, 200);
      //Update Spawn Info
      Game.spawns[currentSpawn].currentSpawnCreepsAndEnergy();
      }
    }
  }
}
