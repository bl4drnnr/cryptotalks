import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from '@modules/crypto.service';
import { JwtGuard } from '@guards/jwt.guard';
import { UserDecorator } from '@decorators/user.decorator';

@ApiTags('Crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @ApiOperation({ summary: 'List cryptos' })
  @ApiResponse({
    status: 200,
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

  @ApiOperation({ summary: 'Gets crypto by its id' })
  @ApiResponse({
    status: 200,
    description: 'As a response function returns cryptocurrency'
  })
  @Get('get/:id')
  getCryptoById(@Param('id') id: string) {
    return this.cryptoService.getCryptoById({ id });
  }

  @ApiOperation({ summary: "Adds a crypto to user's favorites" })
  @ApiResponse({
    status: 200,
    description: 'As a response function returns success message'
  })
  @UseGuards(JwtGuard)
  @Patch('favorite/:id')
  addCryptoToFavorites(
    @Param('id') cryptoId: string,
    @UserDecorator() userId: string
  ) {
    return this.cryptoService.addCryptoToFavorites({ cryptoId, userId });
  }

  @ApiOperation({ summary: "Removes a crypto to user's favorites" })
  @ApiResponse({
    status: 200,
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
