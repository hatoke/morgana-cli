#! /usr/bin/env node
const { Command } = require("commander");
const { createApp, generateAny } = require("./commands");

const program = new Command();
program
  .name("morgana-cli")
  .description("Personal Cli")
  .version("0.0.1", "-v, --vers", "output the current version")
  .action(() => {
    console.log(`
    Author Berkay Uzun
                                                                                                      
       @@@                               @@& .    
      ,& @@@@@                       &@@@, @      
       @    #@@@@@@@@@@@@@@@@@@@@@@@@@     % .    
       @    @@@@@@@@@@@@@@@@@@@@@@@@@@@    @      
        @@@@#.@@@@@@@@@@@@@@@@@@@@@@@ @@@&@       
        @#       @@@@@@@@@@@@@@@@@       @@       
       @#         @@@@@@@@@@/@@@@         @@ .    
      @@          @@@@@@@@@@@@@@@         .@*     
      @@.         @@@@@@@@@@@@@@@         @@@     
      @@@        @@@@@@@@@@@@@@@@@       %@@(     
     . @@@@(   @@@@@@@@@@@@@@@@@@@@@   @@@@@ .    
      .     @@@@@@@@%@@@@@@@,@@@@@@@@@@     .     
        .                                 .       
                                                  
               .                   .              
                                                                                                    
  `);
  });

program
  .command("create-app")
  .description("create a project")
  .argument("<string>", "project name")
  .argument("<string>", "project path")
  .action((name, path, options) => createApp(name, path, options));

program
  .command("generate gitginore|readme")
  .description("generate generic file")
  .action((options) => generateAny(options));

program.parse();
