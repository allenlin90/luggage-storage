import { updateGroups } from '../onDragEnd';
import { warehousesMock } from 'mocks/warehouse';

describe('Drag and drop utility functions', () => {
  const warehouses = warehousesMock;
  const [warehouse1, warehouse2] = warehouses;

  test('move in the same group', async () => {
    const updates = updateGroups(warehouses, {
      sourceDropId: warehouse1.id,
      sourceItemIndex: 0,
      destinationDropId: warehouse1.id,
      destinationItemIndex: 1,
    });

    expect(updates).toBeTruthy();
    if (updates) {
      expect(updates[0].items.length).toBe(5);
    }
  });

  test('move between groups', async () => {
    const updates = updateGroups(warehouses, {
      sourceDropId: warehouse1.id,
      sourceItemIndex: 0,
      destinationDropId: warehouse2.id,
      destinationItemIndex: 1,
    });

    expect(updates).toBeTruthy();
    if (updates) {
      expect(updates[0].items.length).toBe(4);
    }
  });

  test('stay the same', async () => {
    const updates = updateGroups(warehouses, {
      sourceDropId: warehouse1.id,
      sourceItemIndex: 0,
      destinationDropId: warehouse1.id,
      destinationItemIndex: 0,
    });

    expect(updates).toBeFalsy();
  });
});
