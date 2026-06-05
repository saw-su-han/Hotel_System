import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequirePermissions } from 'src/auth/decorators/permission.decorator';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions('roles:create')
  @ApiOperation({ summary: 'Create a new role with permissions' })
  @ApiCreatedResponse({ description: 'Role created successfully' })
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  @RequirePermissions('roles:read')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'List of all roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RequirePermissions('roles:read')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiOkResponse({ description: 'Role found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('roles:update')
  @ApiOperation({ summary: 'Update a role (name, add/remove permissions)' })
  @ApiOkResponse({ description: 'Role updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermissions('roles:delete')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiOkResponse({ description: 'Role deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
