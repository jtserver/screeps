var roleTower = {

    /** @param {Creep} creep **/
    run: function(creep) {

           var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.hitsMax > structure.hits); }});
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_ENOUGHT_RESOURCES) {
                  
                }
            }
	}
};

module.exports = roleTower;