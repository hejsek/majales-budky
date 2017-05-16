export class MapController {
  public static refreshData(callplan, log) {
    window['refreshData'](callplan, log);
  }

  public static refreshMapCanvas(voronoi, booths) {
    window['refreshMapCanvas'](voronoi, booths);
  }

  public static refreshTimers() {
    window['refreshTimers']();
  }
}
