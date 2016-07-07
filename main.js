
//require('config');

var roleHarvesterB = require('role.harvesterB');
var roleHarvesterD = require('role.harvesterD');
var roleRefillerA = require('role.refillerA');
var roleRefillerB = require('role.refillerB');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFillerA = require('role.fillerA');
var roleFillerB = require('role.fillerB');
var roleRepair = require('role.repair');

module.exports.loop = function () {

    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesterB = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterB');
    var harvesterC = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterC');
    var harvesterD = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterD');
    var refillerA = _.filter(Game.creeps, (creep) => creep.memory.role == 'refillerA');
    var refillerB = _.filter(Game.creeps, (creep) => creep.memory.role == 'refillerB');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var fillerA = _.filter(Game.creeps, (creep) => creep.memory.role == 'fillerA');
    var fillerB = _.filter(Game.creeps, (creep) => creep.memory.role == 'fillerB');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Bdrs: ' + builders.length);

    if(harvesterD.length < 1) {
        var newName = Game.spawns.Centrum.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvesterD'});
        console.log('Spawning new harvester: ' + newName);
    }
    else
    {
       if(fillerA.length < 1) {
            var newName = Game.spawns.Centrum.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'fillerA'});
            console.log('Spawning new filler A: ' + newName);
        }
    
        else if(fillerB.length < 2) {
            var newName = Game.spawns.Centrum.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'fillerB'});
            console.log('Spawning new filler B: ' + newName);
        }

        else if(refillerA.length < 1) {
            var newName = Game.spawns.Centrum.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'refillerA'});
            console.log('Spawning new filler A: ' + newName);
        }
    
        else if(refillerB.length < 1) {
            var newName = Game.spawns.Centrum.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'refillerB'});
            console.log('Spawning new filler B: ' + newName);
        }
        
        else
        {
        
            if(repairer.length < 1) {
                var newName = Game.spawns.Centrum.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repair'});
                console.log('Spawning new Repairer: ' + newName);
            }
            
            if(upgrader.length < 3) {
                var newName = Game.spawns.Centrum.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}); // FAST
                //var newName = Game.spawns.Centrum.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'}); // SLOW
                console.log('Spawning new upgrader: ' + newName);
            }
            
            if(builders.length < 1) {
                var newName = Game.spawns.Centrum.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
                console.log('Spawning new builder: ' + newName);
            }

            if(harvesterB.length < 3) {
                var newName = Game.spawns.Centrum.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvesterB'});
                console.log('Spawning new builder: ' + newName);
            }
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvesterD') {
            roleHarvesterD.run(creep);
        }
        if(creep.memory.role == 'harvesterB') {
            roleHarvesterB.run(creep);
        }
        if(creep.memory.role == 'refillerA') {
            roleRefillerA.run(creep);
        }
        if(creep.memory.role == 'refillerB') {
            roleRefillerB.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fillerA') {
            roleFillerA.run(creep);
        }
        if(creep.memory.role == 'fillerB') {
            roleFillerB.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }

    var tower = Game.getObjectById('577977c52ccc1bb95700700a');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile)
        {
            tower.attack(closestHostile);
        
        } else if(tower.energy > 200)
        {
            var targets = tower.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.hitsMax > structure.hits); }});
            if(targets.length > 0)
            {
                tower.repair(targets[0]);

            }else
            {
                var targets = tower.room.find(FIND_STRUCTURES, { filter: (structure) => { return ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) && 10000 > structure.hits); }});
                if(targets.length > 0)
                {
                    tower.repair(targets[0]);
                }
            }
        }


    }
}