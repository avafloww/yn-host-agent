import { Command, Console } from 'nestjs-console';
import * as fs from 'fs/promises';
import * as mkdirp from 'mkdirp';
import { exec } from './exec';

@Console()
export class ConsoleService {

  @Command({
    command: 'install',
    description: 'installs the agent',
  })
  async install(): Promise<void> {
    const destinationDir = `/etc/yesternet`;

    // copy ourselves to the destination directory
    await mkdirp(destinationDir);
    await fs.copyFile(
      process.execPath,
      `${destinationDir}/yn-host-agent`,
    );

    // write the systemd unit file
    const file = await fs.open('/etc/systemd/system/yn-host-agent.service', 'w');
    await file.write(`
    [Unit]
    Description=yn-host-agent
    After=network.target
    
    [Service]
    Type=simple
    ExecStart=${destinationDir}/yn-host-agent
    Restart=always
    
    [Install]
    WantedBy=multi-user.target
    `);
    await file.close();

    // reload the systemd daemon
    const { stdout, stderr } = await exec('systemctl daemon-reload');
    if (stderr) {
      console.error(stderr);
    }
    console.log(stdout);

    console.log('yn-host-agent service installed.');
  }
}
