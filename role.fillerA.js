var roleFillerA = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
	     if(creep.ticksToLive < 300 && Game.spawns.Centrum.energy == 300)
        {
            creep.memory.state = 'renewing';
        }

        if(creep.memory.state == 'renewing')
        {
            var chargeState = Game.spawns.Centrum.renewCreep(creep);

            if( chargeState == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns.Centrum);
            }

            if(creep.ticksToLive > 1450 || Game.spawns.Centrum.energy < 50)
            {
                    creep.memory.state = 'working';
            }

        } else if(creep.carry.energy < creep.carryCapacity)
	    {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[1]);
            }
        }
        else 
	        {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
    }
};

module.exports = roleFillerA;