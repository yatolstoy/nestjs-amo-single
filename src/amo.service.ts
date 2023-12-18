import { Injectable, Inject } from '@nestjs/common';
import { AMO_CONNECT_OPTIONS } from './amo.constants';
import { Amo } from '@shevernitskiy/amo';
import { AmoConnectOptions } from './interfaces';

@Injectable()
export class AmoSingleService extends Amo {
  constructor(
    @Inject(AMO_CONNECT_OPTIONS)
    private readonly amoConnectOptions: AmoConnectOptions,
  ) {
    super(
      amoConnectOptions.base_url,
      amoConnectOptions.auth,
      amoConnectOptions.options,
    );
  }
}
