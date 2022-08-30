interface ProcessorOpts {
  propagate: boolean;
}

export class System {
  static instance: System;
  static useSystem() {
    if (!this.instance) {
      this.instance = new System();

      return this.instance;
    } else {
      return this.instance;
    }
  }

  public context: { [triggerer: string]: any } = {};

  private processors: { [triggerer: string]: any } = {};

  private triggerWithoutUid = (name) => name.split(':')[0];

  public findProcess(trigger: string) {
    return Object.keys(this.context)
      .filter((k) => this.triggerWithoutUid(k) === trigger)
      .map((c) => this.context[c]);
  }

  public upProcess(obj: any, trigger: string, uid?: string) {
    const processName = !uid ? trigger : `${trigger}:${uid}`;
    this.context[processName] = obj;
  }

  public downProcess(trigger: string) {
    Object.keys(this.context)
      .filter((k) => this.triggerWithoutUid(k) === trigger)
      .forEach((c) => delete this.context[c]);
  }

  public registerProcessor(trigger: string, opts: ProcessorOpts) {
    this.processors[trigger] = opts;
  }
  public getProcessorInfo(trigger: string): ProcessorOpts | null {
    return this.processors[trigger];
  }
}

export const useSystem = (): System => System.useSystem();
