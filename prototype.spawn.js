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
    this.memory.currentHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    this.memory.currentUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    this.memory.currentBuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    this.memory.currentMeleeAttacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker');
    this.memory.currentRanger = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranger');
    this.memory.currentCreepAmount = this.memory.currentHarvesters.length
                                  + this.memory.currentUpgrader.length
                                  + this.memory.currentBuilder.length
                                  + this.memory.currentMeleeAttacker.length
                                  + this.memory.currentRanger.length;
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
    if(energy >= 200) {
      return this.spawnCreep([WORK, CARRY, MOVE],
        'Harvester' + Game.time,
        { memory: {role: 'harvester', harvesting: false, sourceID: sourceID, moving: true, target: null}});
    }
    else if(energy < 200) {
      console.log("err");
      //console.log("using balanced spawnn");
      //thii.spawnBlanceCustomCreep()
    }
  };

StructureSpawn.prototype.spawnUpgrader =
    function(sourceID, energy ) {
        if(energy >= 200) {
            return this.spawnCreep([WORK, CARRY, MOVE],
              'Harvester' + Game.time,
              { memory: {role: 'upgrader', harvesting: false, sourceID: sourceID, moving: true, target: null}});
        }
        else if(energy < 200) {
          console.log("err");
            //console.log("using balanced spawnn");
            //thii.spawnBlanceCustomCreep()
        }
    };

  StructureSpawn.prototype.spawnUpgrader =
      function(sourceID, energy ) {
          if(energy >= 200) {
              return this.spawnCreep([WORK, CARRY, MOVE],
                'Harvester' + Game.time,
                { memory: {role: 'harvester', harvesting: false, sourceID: sourceID, moving: true, target: null}});
          }
          else if(energy < 200) {
            console.log("err");
              //console.log("using balanced spawnn");
              //thii.spawnBlanceCustomCreep()
          }
      };


}
