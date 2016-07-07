var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy == 0)
	    {
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
            if(sources[1].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[1]);
            }
        }
       else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType != STRUCTURE_WALL && structure.hitsMax > structure.hits); }});
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else
            {
                creep.moveTo(Game.flags.pausePoint);
            }
        }
    }
};

module.exports = roleRepair;