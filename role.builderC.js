var roleBuilderC = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        if(creep.room.name == 'E16N39')
	        {
	            var exitDir = creep.room.findExitTo('E17N39');
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
	        }
	        else
	        {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[1]);
                    }
                }
            }
	    }
	    else {
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
	}
};

module.exports = roleBuilderC;