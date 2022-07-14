import type { IWarehouse, IItem } from 'types/warehouse';

export const reorder = <T extends IItem>(
  list: T[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = <T extends IItem>(
  source: T[],
  destination: T[],
  {
    sourceGroupId: droppableSourceId,
    destinationGroupId: droppableDestinationId,
    sourceIndex,
    destinationIndex,
  }: {
    sourceGroupId: number;
    destinationGroupId: number;
    sourceIndex: number;
    destinationIndex: number;
  }
) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destinationIndex, 0, removed);

  const result: { [key: string]: any } = {};
  result[droppableSourceId] = sourceClone;
  result[droppableDestinationId] = destClone;

  return result;
};

export interface DragResult {
  sourceDropId: string;
  sourceItemIndex: number;
  destinationDropId: string;
  destinationItemIndex: number;
}

export const updateGroups = <T extends IWarehouse>(
  groups: T[],
  {
    sourceDropId: sId,
    sourceItemIndex: sIndex,
    destinationDropId: dId,
    destinationItemIndex: dIndex,
  }: DragResult
) => {
  if (sId === dId && sIndex === dIndex) {
    // exact same location and group
    return;
  }

  const sGroupIndex = groups.findIndex((group) => group.id === sId);

  if (sId === dId) {
    // in the same group
    const list = groups[sGroupIndex].items;
    const items = reorder(list, sIndex, dIndex);
    const newGroups = [...groups];
    newGroups[sGroupIndex] = {
      ...groups[sGroupIndex],
      items: items as unknown as T,
    };

    return newGroups;
  } else {
    const list = [...groups];
    const dGroupIndex = groups.findIndex((group) => group.id === dId);
    const results = move(groups[sGroupIndex].items, groups[dGroupIndex].items, {
      sourceGroupId: sGroupIndex,
      destinationGroupId: dGroupIndex,
      sourceIndex: sIndex,
      destinationIndex: dIndex,
    });
    list[sGroupIndex] = { ...list[sGroupIndex], items: results[sGroupIndex] };
    list[dGroupIndex] = { ...list[dGroupIndex], items: results[dGroupIndex] };

    return list;
  }
};
