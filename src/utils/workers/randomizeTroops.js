self.addEventListener("message", (e) => {
  const { infantry, morter, cannon, tanks, matrixA, matrixB, nPoints } = e.data;
  const troopsA = [],
    troopsB = [];

  const randomize = (size, start = 0) => {
    return start + Math.floor(Math.random() * size);
  };

  const getRandomPosition = (nPoints) => {
    const i = randomize(nPoints),
      j = randomize(nPoints);
    console.log(i, j);
    return [i, j];
  };

  const getTypeInfo = (type) => {
    let damage, life;

    switch (type) {
      case "Infantry":
        (damage = 500_000), (life = 1_000_000);
        return [damage, life, "#D4E700"];
      case "Canion":
        (damage = 3_000_000), (life = 3_000_000);
        return [damage, life, "#EBE18B"];
      case "Plane":
        (damage = 1_500_000), (life = 5_000_000);
        return [damage, life, "#757575"];
      case "Tank":
        (damage = 5_000_000), (life = 10_000_000);
        return [damage, life, "#245F00"];
    }
  };

  const setTroopPoint = (point, type, matrix, troopsParty) => {
    const info = getTypeInfo(type, matrix);
    if (info) {
      const [damage, life, color] = info;

      point.troop = {
        color,
        type,
        damage,
        life,
      };
    }
    troopsParty.push(point);
  };

  const randomizeTroopsPerType = (matrixA, matrixB, troopsNumber, type) => {
    for (let k = 1; k <= troopsNumber; k++) {
      let pointA, pointB;

      do {
        const [i, j] = getRandomPosition(nPoints);
        console.log(i, j);
        console.log(matrixA);
        pointA = matrixA[i][j];
      } while (pointA.troop);

      do {
        const [i, j] = getRandomPosition(nPoints);
        pointB = matrixB[i][j];
      } while (pointB.troop);

      setTroopPoint(pointA, type, "A", troopsA);
      setTroopPoint(pointB, type, "B", troopsB);
    }
  };

  console.log(infantry, morter, cannon, tanks, matrixA, matrixB);

  const matrixAAux = matrixA;
  const matrixBAux = matrixB;
  console.log(matrixAAux, matrixBAux);

  randomizeTroopsPerType(matrixAAux, matrixBAux, infantry, "Infantry");
  randomizeTroopsPerType(matrixAAux, matrixBAux, tanks, "Tank");
  randomizeTroopsPerType(matrixAAux, matrixBAux, morter, "Plane");
  randomizeTroopsPerType(matrixAAux, matrixBAux, cannon, "Canion");

  self.postMessage([matrixAAux, matrixBAux, troopsA, troopsB]);
});
