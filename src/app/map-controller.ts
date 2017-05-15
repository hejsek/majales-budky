export class MapController {
  public static refreshData(callplan, log) {
    window['refreshData'](callplan, log);
  }

  public static refreshTimers() {
    window['refreshTimers']();
  }
}
