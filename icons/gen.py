import struct, zlib

def make_icon_png(size):
    w, h = size, size
    rows = []
    cx, cy = w / 2.0, h / 2.0
    bg_r, bg_g, bg_b = 108, 99, 255  # #6c63ff

    for y in range(h):
        row = bytearray([0])  # filter byte
        for x in range(w):
            # Rounded rectangle background
            pad = size * 0.10
            in_rect = (pad <= x <= w - pad) and (pad <= y <= h - pad)

            # Corner rounding
            corner_r = size * 0.18
            in_bg = True
            for (cx2, cy2) in [(pad + corner_r, pad + corner_r),
                                (w - pad - corner_r, pad + corner_r),
                                (pad + corner_r, h - pad - corner_r),
                                (w - pad - corner_r, h - pad - corner_r)]:
                if x < pad + corner_r and y < pad + corner_r:
                    dx, dy = x - (pad + corner_r), y - (pad + corner_r)
                    in_bg = dx*dx + dy*dy <= corner_r*corner_r
                    break
                if x > w - pad - corner_r and y < pad + corner_r:
                    dx, dy = x - (w - pad - corner_r), y - (pad + corner_r)
                    in_bg = dx*dx + dy*dy <= corner_r*corner_r
                    break
                if x < pad + corner_r and y > h - pad - corner_r:
                    dx, dy = x - (pad + corner_r), y - (h - pad - corner_r)
                    in_bg = dx*dx + dy*dy <= corner_r*corner_r
                    break
                if x > w - pad - corner_r and y > h - pad - corner_r:
                    dx, dy = x - (w - pad - corner_r), y - (h - pad - corner_r)
                    in_bg = dx*dx + dy*dy <= corner_r*corner_r
                    break
                in_bg = in_rect
                break

            if not in_bg:
                row += bytearray([0, 0, 0, 0])
                continue

            # White lines (text simulation)
            lx = int(w * 0.27)
            line_h = max(1, int(h * 0.055))
            line_y1 = int(h * 0.37)
            line_y2 = int(h * 0.50)
            line_y3 = int(h * 0.63)
            lw1, lw2, lw3 = int(w * 0.46), int(w * 0.34), int(w * 0.40)

            # Top notch (clip indicator)
            notch_w = int(w * 0.30)
            notch_h = max(1, int(h * 0.09))
            notch_x = int((w - notch_w) / 2)
            notch_y = int(h * 0.14)

            in_notch = (notch_x <= x < notch_x + notch_w) and (notch_y <= y < notch_y + notch_h)
            in_l1 = (lx <= x < lx + lw1) and (line_y1 <= y < line_y1 + line_h)
            in_l2 = (lx <= x < lx + lw2) and (line_y2 <= y < line_y2 + line_h)
            in_l3 = (lx <= x < lx + lw3) and (line_y3 <= y < line_y3 + line_h)

            if in_notch or in_l1 or in_l2 or in_l3:
                row += bytearray([255, 255, 255, 220])
            else:
                row += bytearray([bg_r, bg_g, bg_b, 255])

        rows.append(bytes(row))

    raw = b''.join(rows)
    compressed = zlib.compress(raw, 9)

    def make_chunk(tag, data):
        body = tag + data
        crc = zlib.crc32(body) & 0xFFFFFFFF
        return struct.pack('>I', len(data)) + body + struct.pack('>I', crc)

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    png = (b'\x89PNG\r\n\x1a\n'
           + make_chunk(b'IHDR', ihdr)
           + make_chunk(b'IDAT', compressed)
           + make_chunk(b'IEND', b''))
    return png

for size in [16, 32, 48, 128]:
    data = make_icon_png(size)
    path = f'icon{size}.png'
    with open(path, 'wb') as f:
        f.write(data)
    print(f'{path}: {len(data)} bytes')
