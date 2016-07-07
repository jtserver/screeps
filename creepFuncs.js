var creepFuncs = {

// getEnergyFrom(creepObject, posibleSources[s1[name,minTankLvl],s2[name,minTankLvl]]) -> Obtindre energia de tancs.

EnergyTransfer: function(creep, action, sources) {

    switch(creep.memory.source)
    {
        case undefined:
        
            creep.memory.source = 'none';
            break;

        case 'none':
                
            for(var x in sources)
            {
                console.log('X =' + x + ' contingut ='+ sources[x][0]);
                
                if(creep.memory.source = 'none')
                {
                    if(Game.getObjectById(sources[x][0]).store[RESOURCE_ENERGY] > sources[x][1])
                    {
                        creep.memory.source = sources[x][0];
                        creep.memory.sourceMinvalue = sources[x][1];
                    }
                }    
            }
            break;

        default:

            if(creep.memory.sourceMinvalue > Game.getObjectById(creep.memory.source).store[RESOURCE_ENERGY])
            {
                creep.memory.source = 'none';
            }
    }

    if(creep.memory.source != "none" && creep.memory.source != undefined)
    {
        if(Game.getObjectById(creep.memory.source).transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(Game.getObjectById(creep.memory.source));
        }
    }

},

// RenewCreep(creepObject, ttl to go to renew, renew from spawn) -> Renovar el creep.

RenewCreep: function(creep, minHeal, healSpawn) {

    switch(creep.memory.renewing)
    {
        case undefined:
        
            creep.memory.renewing = false;
            break;

        case true:

            if( healSpawn.renewCreep(creep) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(healSpawn);
            }

            if(creep.ticksToLive > 1450 || healSpawn < 50)
            {
                creep.memory.renewing = false;
            }
            break;

        default:

            if(creep.ticksToLive < minHeal && healSpawn.energy == 300)
            {
                creep.memory.renewing = true;
            }
            break;
    }
    return(creep.memory.renewing); 

}// END OF RenewCreep

}; module.exports = creepFuncs;