//Ranger
module.exports = {
    
    run: function(creep) {
		//Prioritize objectAttack over closestHostileAttack
		var attack = false;
		var attackFlag = Game.flags.Attack;
		var objectAttack = Game.getObjectById('5b79fe852dc34e41c6c0a367');
		
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		//Standby in my room
        if(creep.room == Game.spawns['Spawn1'].room && attack == false) {
			
			if(target) {
				if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
				}
            }
            else{
            creep.moveTo(new RoomPosition(24, 9, Game.spawns['Spawn1'].room.name), {visualizePathStyle: {stroke: '#FF0000'}});
            }
        }
		//Attack another room + attack all hostile creeps during the way
        else if(attack == true && attackFlag){
			
			//Attackroom
			if(creep.room == attackFlag.room) {
				if(objectAttack) {
					if(creep.rangedAttack(objectAttack) == ERR_NOT_IN_RANGE) {
						creep.moveTo(objectAttack, {visualizePathStyle: {stroke: '#FF0000'}});
					}
				}
				else if(target) {
					if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
					}
				}
			}
			//On the Way
			else {
				if(target) {
					if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
					}
				}
				else {
					creep.moveTo(attackFlag, {visualizePathStyle: {stroke: '#FF0000'}});
					//creep.moveTo(new RoomPosition(46, 25, attackFlag.room.name), {visualizePathStyle: {stroke: '#FF0000'}});
				}  
			}
			
			
        }
    }
};