module.exports = function() {
StructureSpawn.prototype.setMinRoles =
  function(numberOfMinimumHarvesters,
    numberOfMinimumUpgraders,
    numberOfMinimumBuilder,
    numberOfMinimumMeleeAttacker,
    numberOfMinimumRanger){

    this.memory.numberOfMinimumHarvesters = numberOfMinimumHarvesters;
    this.memory.numberOfMinimumUpgraders = numberOfMinimumUpgraders;
    this.memory.numberOfMinimumBuilder = numberOfMinimumBuilder;
    this.memory.numberOfMinimumMeleeAttacker = numberOfMinimumMeleeAttacker;
    this.memory.numberOfMinimumRanger = numberOfMinimumRanger;
    this.memory.numberOfSetMinimumCreeps = numberOfMinimumHarvesters
                                  + numberOfMinimumUpgraders
                                  + numberOfMinimumBuilder
                                  + numberOfMinimumMeleeAttacker
                                  + numberOfMinimumRanger;
    };

StructureSpawn.prototype.currentSpawnCreepsAndEnergy =
  function(){
    this.memory.currentEnergy = this.room.energyAvailable;

    //Creeps
    this.memory.currentHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.sourceID == this.name).length;
    this.memory.currentUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.sourceID == this.name).length;
    this.memory.currentBuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.sourceID == this.name).length;
    this.memory.currentMeleeAttacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker' && creep.memory.sourceID == this.name).length;
    this.memory.currentRanger = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranger' && creep.memory.sourceID == this.name).length;
    this.memory.currentCreepAmount = this.memory.currentHarvesters
                                  + this.memory.currentUpgrader
                                  + this.memory.currentBuilder
                                  + this.memory.currentMeleeAttacker
                                  + this.memory.currentRanger;
    };

//Create Creeps
StructureSpawn.prototype.spawnBlanceCustomCreep =
  function(energy, roleName, sourceID) {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }
    // create creep with the created body and the given role
    return this.spawnCreep(body, rolename + Game.time,
         {memory: {role: roleName, moving: true, target: null}});
    };

StructureSpawn.prototype.spawnHarvester =
  function(sourceID, energy ) {
    if(energy >= 550) {
      return this.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        'Harvester' + Game.time,
        {memory: {role: 'harvester', harvesting: false, sourceID: sourceID, moving: true, target: null}});
    }
    else {
      console.log("err");
      //console.log("using balanced spawnn");
      //thii.spawnBlanceCustomCreep()
    }
  };

  StructureSpawn.prototype.spawnUpgrader =
    function(sourceID, energy) {
      if(energy >= 550) {
        return this.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
          'Upgrader' + Game.time,
          {memory: {role: 'upgrader', harvesting: false, sourceID: sourceID, moving: true, target: null}});
      }
      else {
        console.log("err");
          //console.log("using balanced spawnn");
          //thii.spawnBlanceCustomCreep()
      }
    };

  StructureSpawn.prototype.spawnBuilder =
    function(sourceID, energy) {
      if(energy >= 550) {
        return this.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
          'Builder' + Game.time,
          {memory: {role: 'builder', harvesting: false, sourceID: sourceID, moving: true, repair_: false, target: null}});
      }
      else {
        console.log("err");
          //console.log("using balanced spawnn");
          //thii.spawnBlanceCustomCreep()
      }
    };

  StructureSpawn.prototype.spawnMeleeAttacker =
    function(sourceID, energy) {
      if(energy >= 500) {
        return this.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, MOVE],
          'MeleeAttacker' + Game.time,
          {memory: {role: 'meleeAttacker', sourceID: sourceID, moving: true, target: null}});
      }
      else {
        console.log("err");
          //console.log("using balanced spawnn");
          //thii.spawnBlanceCustomCreep()
      }
    };

  StructureSpawn.prototype.spawnRanger =
    function(sourceID, energy) {
      if(energy >= 200) {
        return this.spawnCreep([RANGED_ATTACK, MOVE],
          'Ranger' + Game.time,
          {memory: {role: 'ranger', sourceID: sourceID, moving: true, target: null}});
      }
      else {
        console.log("err");
          //console.log("using balanced spawnn");
          //thii.spawnBlanceCustomCreep()
      }
    };

}
