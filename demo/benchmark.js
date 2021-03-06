const bm = window.bm = {
  ticks: 0,
  fps: 0,
  timeout: 0,
  fps_timeout: 0,
  run: async () => {
    bm.fps_timeout = setTimeout(bm.count_fps, 1000)
    bm.redraw()
    for (;;) {
      const c = await getch()
      if (c == KEY_Q) {
        clear()
        cancelAnimationFrame(bm.timeout)
        clearTimeout(bm.fps_timeout)
        return
      }
    }
  },
  redraw: () => {
    clear()
    for (let y = 0; y < 29; y++)
      for (let x = 0; x < 60; x++) {
        let k = Math.round(Math.random()
                           * ("Z".charCodeAt(0) - "A".charCodeAt(0)))
        k += "A".charCodeAt(0)
        const c = String.fromCharCode(k)
        let attrs = 0
        if (Math.round(Math.random()))
          attrs |= A_BOLD

        if (Math.round(Math.random()))
          attrs |= A_REVERSE

        if (Math.round(Math.random()))
          attrs |= A_UNDERLINE

        attrs |= COLOR_PAIR(Math.round(Math.random() * 6))
        addstr(y, x, c, attrs)
      }

    addstr(29, 0, "press q to quit", A_BOLD | A_REVERSE)
    if (bm.fps) {
      const msg = bm.fps + " FPS"
      const n = msg.length
      addstr(29, 60 - n, msg, A_BOLD | A_REVERSE)
    }
    refresh()
    bm.timeout = requestAnimationFrame(bm.redraw)
    bm.ticks++
  },
  count_fps: () => {
    bm.fps = bm.ticks
    bm.ticks = 0
    clearTimeout(bm.fps_timeout)
    bm.fps_timeout = setTimeout(bm.count_fps, 1000)
  }
}
