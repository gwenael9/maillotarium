import { BadRequestException } from '@nestjs/common';

/**
 * Vérification s'il y a des modifications entre le DTO et l'entité.
 * @param dto
 * @param entity
 */
export function verifIfHasChanges<T>(dto: Partial<T>, entity: T): void {
  const message = "Aucune modification n'a été détectée.";

  if (!dto || Object.keys(dto).length === 0) {
    throw new BadRequestException(message);
  }

  const hasChanges = Object.keys(dto).some(
    (key) => dto[key] !== undefined && dto[key] !== entity[key],
  );

  if (!hasChanges) throw new BadRequestException(message);
}
