var roleHarvester = {

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
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
			//Setzte Targets
			if(creep.memory.target == null) {
				//Tower + Grund var temp
				var temp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: (structure) => {
								return (structure.structureType == STRUCTURE_EXTENSION ||
										structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity * 0.9;
							}
					});
				if(temp && creep.room.energyAvailable > creep.room.energyCapacityAvailable/2) {
					//Fülle Tower, benötigt genügend Raum Energy und Tower Energy unter 10%
					creep.memory.target = temp.id;
				}
				else{
					//Extensions und Spawns
					temp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: (structure) => {
								return (structure.structureType == STRUCTURE_EXTENSION ||
										structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
							}
					});
					if(temp) {
						creep.memory.target = temp.id;
					}
					else{
						//Storage
						temp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: (structure) => (structure.structureType == STRUCTURE_STORAGE
								&& structure.store.energy < structure.storeCapacity)
						});
						if(temp) {
							creep.memory.target = temp.id;
						}
					}
				}
			}


			//Gehe zu Target und fülle
			var targetObjekt = Game.getObjectById(creep.memory.target);
			if(creep.memory.target != null) {
				if(creep.transfer(targetObjekt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetObjekt, {visualizePathStyle: {stroke: '#ffffff'}});
				}
				//Suche ein neues Target wenn
				if(creep.carry.energy == 0 ||
					targetObjekt.energy == targetObjekt.energyCapacity ||
					targetObjekt.store == targetObjekt.storeCapacity) {

					creep.memory.target = null;
				}
			}
			else {
				//Nichts zu tun
				creep.moveTo(Game.flags.harvester_wait);
			}
        }
	}
};

module.exports = roleHarvester;
