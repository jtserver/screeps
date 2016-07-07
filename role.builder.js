var creepFuncs = require('creepFuncs');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

    if(!creepFuncs.RenewCreep(creep, 500, Game.spawns.Centrum))
    {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[targets.length-1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targets.length-1]);
                }
            }
            else
            {
                creep.moveTo(Game.flags.pausePoint);
            }
	    }
	    else        
        {
            var mySources = [t1 = ['577bda3f904152921634bdfc', '1000']];
            creepFuncs.EnergyTransfer(creep,false, mySources);
        } 
	}}
};

module.exports = roleBuilder;
