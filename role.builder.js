var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Funktioniert fast genau so wie die anderen Überprüfungen
	    if(creep.memory.harvesting == false && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
	    }
	    if(creep.memory.harvesting == true && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = false;
	    }

        //Negierung da gebaut werden soll, wenn er voll ist und er nicht abbaut
	    if(! (creep.memory.harvesting)) {

			//Bauliste
			var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

			//bauen
			if(targets) {
				if(creep.build(targets) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets, {visualizePathStyle: {stroke: '#00BFFF'}});
				}
			}
			else {

				var fueltowers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
				});

			fueltowers.sort((a,b) => a.hits - b.hits);
				if(creep.transfer(fueltowers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(fueltowers[0], {visualizePathStyle: {stroke: '#00BFFF'}});
				}

				//Standby
				else {
					creep.moveTo(Game.flags.builder_wait);
				}
			}

		}
		//wenn Ressourcen abgebaut werden
	    else {
	        var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if (sources) {
				if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#00BFFF'}});
				}
			}

	    }
	}
};

module.exports = roleBuilder;
