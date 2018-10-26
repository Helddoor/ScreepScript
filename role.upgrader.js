var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //wenn du abbaust und voll bist -> höhre auf abzubauen
        if(creep.memory.harvesting == true && creep.carry.energy == creep.carryCapacity){
            creep.memory.harvesting = false;
        }
        //wenn du nicht abbaust und leer bist -> baue wieder ab
        else if(creep.memory.harvesting == false && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        

	    if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;