var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy < 50)
        {
            var nivellMax = 0;
            var sourceTank = 0;
            var sources = creep.room.memory.reserveTanks;
            
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
        }
        else
        {
            if(creep.carry.energy == creep.carryCapacity) {
                if(creep.room.name != 'E16N39')
                {
                    var exitDir = creep.room.findExitTo('E16N39');
                    var exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(exit);
                }
                else
                {
                    var upgrErr = creep.upgradeController(Game.getObjectById('576a9c5657110ab231d88e88'));

                    switch (upgrErr)
                    {
                        case ERR_NOT_ENOUGH_RESOURCES:

                            var sources = creep.room.find(FIND_SOURCES);
                            if(creep.harvest(sources[0]) == ERR_NOT_OWNER)
                            {
                                creep.moveTo(sources[0]);
                                creep.say('soy minerooo');
                            }
                            break;

                        case ERR_NOT_IN_RANGE:

                            creep.moveTo(Game.getObjectById('576a9c5657110ab231d88e88'));
                            creep.say('voy');
                            break;

                        case ERR_NOT_OWNER:

                            creep.say('No puedor!');
                            break;
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;