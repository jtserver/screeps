var roleHarvesterB = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        if(creep.room.name != 'E16N39')
	        {
	            var exitDir = creep.room.findExitTo('E16N39');
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
	        }
	        else
	        {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
	        }
        }
        else {
            if(creep.room.name == 'E16N39')
	        {
	            var exitDir = creep.room.findExitTo('E17N39');
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
	        }
            else
            {
                if(creep.transfer(Game.getObjectById('577bda3f904152921634bdfc'), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById('577bda3f904152921634bdfc'));
                }

            }
	    }
    }
};

module.exports = roleHarvesterB;