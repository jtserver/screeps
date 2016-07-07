var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.ticksToLive < 500 && Game.spawns.Centrum.energy == 300)
        {
            creep.memory.state = 'renewing';
            creep.memory.upgrading = false;
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

        } else
        {
             if(creep.memory.upgrading && creep.carry.energy == 0)
            {
                creep.memory.upgrading = false;
    	    }
    	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.upgrading = true;
    	    }

    	    if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {

                if(Game.getObjectById('577bda3f904152921634bdfc').transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.getObjectById('577bda3f904152921634bdfc'));
                }
            }
        }
	}
};

module.exports = roleUpgrader;