import { KarmaServer } from "./../karma/karma-server";
import { FileHelper } from "./../integration/file-helper";
import { KarmaEventListener } from "./../integration/karma-event-listener";
import { AngularServer } from "./../angular/angular-server";
import { TestServer } from "../../model/test-server";
import { ProjectType } from "../../model/project-type.enum";
import { Logger } from "../shared/logger";
import { AngularProcessHandler } from "../integration/angular-process-handler";
import { AngularProjectConfigLoader } from "../angular/angular-project-config-loader";
import { AngularProcessConfigurator } from "../angular/angular-process-configurator";

export class TestServerFactory {
  public constructor(
    private readonly karmaEventListener: KarmaEventListener,
    private readonly logger: Logger,
    private readonly fileHelper: FileHelper
  ) {}
  public createTestServer(projectType: ProjectType): TestServer {
    switch (projectType) {
      case ProjectType.AngularCLI:
        return new AngularServer(
          this.karmaEventListener,
          this.logger,
          new AngularProcessHandler(this.logger, this.karmaEventListener),
          new AngularProjectConfigLoader(this.fileHelper),
          new AngularProcessConfigurator(this.fileHelper)
        );
      case ProjectType.Karma:
        return new KarmaServer(this.karmaEventListener, this.logger, new AngularProcessHandler(this.logger, this.karmaEventListener));
      case ProjectType.Angular:
        return new KarmaServer(this.karmaEventListener, this.logger, new AngularProcessHandler(this.logger, this.karmaEventListener));
      default:
        return new AngularServer(
          this.karmaEventListener,
          this.logger,
          new AngularProcessHandler(this.logger, this.karmaEventListener),
          new AngularProjectConfigLoader(this.fileHelper),
          new AngularProcessConfigurator(this.fileHelper)
        );
    }
  }
}
