import { Module, DynamicModule, Provider } from '@nestjs/common';
import { AmoSingleService } from './amo.service';
import { AmoConnectOptions } from './interfaces/amo-module-options.interface';
import { AMO_CONNECTION, AMO_CONNECT_OPTIONS } from './amo.constants';
import { AmoConnectAsyncOptions } from './interfaces/amo-module-async-options.interface';
import { AmoOptionsFactory } from './interfaces/amo-options-factory.interface';

export const connectionFactory = {
  provide: AMO_CONNECTION,
  useFactory: async (AmoSingleService) => {
    return AmoSingleService;
  },
  inject: [AmoSingleService],
};

@Module({})
export class AmoSingleModule {
  public static forRoot(connectOptions: AmoConnectOptions): DynamicModule {
    return {
      module: AmoSingleModule,
      providers: [
        {
          provide: AMO_CONNECT_OPTIONS,
          useValue: connectOptions,
        },
        connectionFactory,
        AmoSingleService,
      ],
      exports: [AmoSingleService, connectionFactory],
    };
  }
  public static forRootAsync(
    connectOptions: AmoConnectAsyncOptions,
  ): DynamicModule {
    return {
      module: AmoSingleModule,
      imports: connectOptions.imports || [],
      providers: [
        this.createConnectAsyncProviders(connectOptions),
        AmoSingleService,
        connectionFactory,
      ],
      exports: [AmoSingleService, connectionFactory],
    };
  }

  private static createConnectAsyncProviders(
    options: AmoConnectAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AMO_CONNECT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: AMO_CONNECT_OPTIONS,
      useFactory: async (optionsFactory: AmoOptionsFactory) =>
        await optionsFactory.createAmoConnectOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
