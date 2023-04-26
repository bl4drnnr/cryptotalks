import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CryptoService } from '@modules/crypto.service';
import { JwtGuard } from '@guards/jwt.guard';
import { UserDecorator } from '@decorators/user.decorator';
import { AddCryptoToFavoriteEventDto } from '@events/add-crypto-to-favorite.event';
import { RemoveCryptoToFavoriteEventDto } from '@events/remove-crypto-from-favorite.event';
import { FavoriteCoins } from '@models/favorites-coins.model';
import { MarketStats } from '@models/market-stats.model';
import { UpdateCoinEventDto } from '@events/update-coin.event';
import { SoftJwtGuard } from '@guards/soft-jwt.guard';

@ApiTags('Crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @ApiOperation({ summary: 'List cryptos' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns list of posts'
  })
  @Get('list/:page/:pageSize/:order/:orderBy')
  async getAllCryptos(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Param('order') order: string,
    @Param('orderBy') orderBy: string,
    @Query('searchQuery') searchQuery: string
  ) {
    return this.cryptoService.listCryptos({
      page,
      pageSize,
      order,
      orderBy,
      searchQuery
    });
  }

  @ApiExtraModels(FavoriteCoins)
  @ApiExtraModels(UpdateCoinEventDto)
  @ApiOperation({ summary: 'Gets crypto by its id' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns cryptocurrency'
  })
  @UseGuards(SoftJwtGuard)
  @Get('get/:uuid')
  getCryptoById(
    @Param('uuid') uuid: string,
    @UserDecorator() userId: string | undefined
  ) {
    return this.cryptoService.getCryptoById({ uuid, userId });
  }

  @ApiExtraModels(MarketStats)
  @ApiOperation({ summary: 'Get market stats' })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns market stats'
  })
  @Get('market-stats')
  getMarketStats() {
    return this.cryptoService.getMarketStats();
  }

  @ApiExtraModels(AddCryptoToFavoriteEventDto)
  @ApiOperation({ summary: "Adds a crypto to user's favorites" })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Patch('favorites/:id')
  addCryptoToFavorites(
    @Param('id') cryptoId: string,
    @UserDecorator() userId: string
  ) {
    return this.cryptoService.addCryptoToFavorites({ cryptoId, userId });
  }

  @ApiExtraModels(RemoveCryptoToFavoriteEventDto)
  @ApiOperation({ summary: "Removes a crypto to user's favorites" })
  @ApiResponse({
    status: 201,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Delete('favorite/:id')
  removeCryptoFromFavorites(
    @Param('id') cryptoId: string,
    @UserDecorator() userId: string
  ) {
    return this.cryptoService.removeCryptoFromFavorites({ cryptoId, userId });
  }
}
