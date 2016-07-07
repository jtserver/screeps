var roleHarvesterC = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        if(creep.ticksToLive < 500 && Game.spawns.Centrum.energy == 300)
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

        } else if(creep.carry.energy < 50)
        {
            var nivellMax = 0;
            var sourceTank = 0;
            var sources = creep.room.memory.cacheTanks;
            
            for(var x in sources)
            {
                if(Game.getObjectById(sources[x]).store[RESOURCE_ENERGY] > nivellMax)
                {
                    nivellMax = Game.getObjectById(sources[x]).store[RESOURCE_ENERGY];
                    sourceTank = sources[x];
                }
            }

            if(Game.getObjectById(sourceTank))
            {
                if(Game.getObjectById(sourceTank).transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.getObjectById(sourceTank));
                }

            }

        } else
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy > structure.energyCapacity;
                }
            });
            
            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0]);
                }
            
            } else
            {
                var nivellMin = 2000;
                var targetTank = 0;
                var targets = creep.room.memory.CentrumTanks;
                
                for(var x in targets)
                {
                    if(Game.getObjectById(targets[x]).store[RESOURCE_ENERGY] < nivellMin)
                    {
                        nivellMin = Game.getObjectById(targets[x]).store[RESOURCE_ENERGY];
                        targetTank = targets[x];
                    }
                }

                if(Game.getObjectById(targetTank))
                {
                    if(creep.transfer(Game.getObjectById(targetTank), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(Game.getObjectById(targetTank));
                    }

                } else
                {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });
                    
                    if(targets.length > 0)
                    {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(targets[0]);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvesterC;
