import { getTypeInfo } from "../../../../models/getTypeInfo";
import { Position } from "../../../../models/Position";
import { TroopType } from "../../../../models/Troop";
import { renderLife } from "./renderLife";

export const renderTroopPoint = (
  ctx: CanvasRenderingContext2D,
  point: Position,
  type: TroopType,
  matrix: "A" | "B"
) => {
  const radius = parseInt(import.meta.env.VITE_RADIUS_TROOP);
  const path = new Path2D();
  const info = getTypeInfo(type, matrix);
  if (info) {
    const [damage, life, color, imgSrc] = info;
    ctx.fillStyle = color;

    const troopImage = new Image();
    troopImage.addEventListener("load", () => {
      ctx.drawImage(
        troopImage,
        point.x - radius,
        point.y - radius,
        radius * 2,
        radius * 2
      );
    });

    troopImage.src = imgSrc;

    if (!point.troop) {
      renderLife(ctx, point.x, point.y, radius * 2, life, life);
      point.troop = {
        path,
        color,
        type,
        damage,
        life,
      };
    } else {
      renderLife(ctx, point.x, point.y, radius * 2, point.troop.life, life);
    }
  }
};
