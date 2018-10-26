//MeeleAttacker
module.exports = {

    run: function(creep) {
		var attack = false;
		var attackFlag = Game.flags.Attack;
		var attackRoom = 'W46N39';
		
		
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(creep.room == Game.spawns['Spawn1'].room && attack == false) {
			
			if(target) {
				if(creep.attack(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
				} 
            }
            else{
				creep.moveTo(new RoomPosition(24, 9, Game.spawns['Spawn1'].room.name), {visualizePathStyle: {stroke: '#FF0000'}});
            }
        }
        else if(attack == true){
			//Attackroom
			if(creep.room == attackFlag.room) {
				if(target) {
					if(creep.attack(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
					}
				}
			}
			//On the Way
			else {
				if(target) {
					if(creep.attack(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
					}
				}
				else {
					creep.moveTo(attackFlag, {visualizePathStyle: {stroke: '#FF0000'}});
					//creep.moveTo(new RoomPosition(46, 25, attackFlag.room.name), {visualizePathStyle: {stroke: '#FF0000'}});
				}  
			}
			
			
			
			
            creep.moveTo(new RoomPosition(46, 25, attackFlag.room.name), {visualizePathStyle: {stroke: '#FF0000'}});
        }
    }
};