import { getPythonRoomBlueprintById, type RoomBlueprint } from '@/src/features/rooms/room-blueprints';

export async function fetchPythonRoomById(roomId: string): Promise<RoomBlueprint | null> {
  return getPythonRoomBlueprintById(roomId);
}
