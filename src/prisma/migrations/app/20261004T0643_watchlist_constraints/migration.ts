#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/55515d5804f66b446e9269ad7010f42a25ce1277363505c5b7666b2638e1b754/contract';
import endContract from '../../snapshots/55515d5804f66b446e9269ad7010f42a25ce1277363505c5b7666b2638e1b754/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/717a8ea04b39a80cd02f819b593b3fb524a9f6c9f90b6a7820892813627d9842/contract';
import startContract from '../../snapshots/717a8ea04b39a80cd02f819b593b3fb524a9f6c9f90b6a7820892813627d9842/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'watchListItem',
        constraint: 'watchListItem_userId_movieId_key',
        columns: ['userId', 'movieId'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
