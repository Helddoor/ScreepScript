var towerDef = {

    run: function(roomName) {
		//Feinde
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
		//Türme
		var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

		var wallHitpointLimit = 100000;
		//Falls Feinde gefunden wurden
        if(hostiles.length > 0) {

            var username = hostiles[0].owner.username;
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
		//Falls keine Feinde gefunden wurden und die Energie mindestens halb voll ist
		else {
			for(let towerID in towers) {
				//mehr als 50% der maximalen Energie
				if(towers[towerID].energy > (Math.floor(towers[towerID].energyCapacity / 2)) ) {
					//Heilen


					const zuHeilen = Game.rooms[roomName].find(FIND_MY_CREEPS, {
					filter: object => object.hits < object.hitsMax});
					zuHeilen.sort((a,b) => a.hits - b.hits);

					towers[towerID].heal(zuHeilen[0]);

					//Repairen alles außer Walls or Ramparts
					var nonWallsOrRamparts = Game.rooms[roomName].find(FIND_STRUCTURES, {

						filter: (s) => 	s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL &&
										s.structureType != STRUCTURE_RAMPART});

						nonWallsOrRamparts.sort((a,b) => a.hits - b.hits);

					if(nonWallsOrRamparts.length > 0) {
						towers[towerID].repair(nonWallsOrRamparts[0]);
					}
					else {

						var walls = Game.rooms[roomName].find(FIND_STRUCTURES, {
						filter: (s) => 	s.structureType == STRUCTURE_WALL &&
										s.hits > 0 && s.hits < wallHitpointLimit});

						walls.sort((a,b) => a.hits - b.hits);

						//Repariere Walls, wenn Energie über 75%
						if(walls.length > 0) {
							if(towers[towerID].energy > ((Math.floor(towers[towerID].energyCapacity / 4) * 3)) && Game.rooms[roomName].energyAvailable > Game.rooms[roomName].energyCapacityAvailable - 100) {
								towers[towerID].repair(walls[0]);
							}
						}
					}
				}
			}
		}
    }
};
module.exports = towerDef;
