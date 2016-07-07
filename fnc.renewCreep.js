var RenewCreep = {

// RenewCreep(creepObject, ttl to go to renew, renew from spawn) -> Renovar el creep.

RenewCreep: function(creep, minHeal, healSpawn) {

    switch(creep.memory.renewing)
    {
        case undefined:
        
            creep.memory.renewing = 'false';
            break;

        case 'true':

            if( healSpawn.renewCreep(creep) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(healSpawn);
            }

            if(creep.ticksToLive > 1450 || healSpawn < 50)
            {
                creep.memory.renewing = 'true';
            }
            break;

        default:

            if(creep.ticksToLive < minHeal && healSpawn.energy == 300)
            {
                creep.memory.renewing = 'true';
            }
            break;
    }

} // END OF RenewCreep

}; module.exports = RenewCreep;