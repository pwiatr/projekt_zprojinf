package com.targ.krakowski.service.mapper;

import com.targ.krakowski.domain.*;
import com.targ.krakowski.service.dto.ExtendedUserDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity ExtendedUser and its DTO ExtendedUserDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface ExtendedUserMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ExtendedUserDTO extendedUserToExtendedUserDTO(ExtendedUser extendedUser);

    List<ExtendedUserDTO> extendedUsersToExtendedUserDTOs(List<ExtendedUser> extendedUsers);

    @Mapping(source = "userId", target = "user")
    ExtendedUser extendedUserDTOToExtendedUser(ExtendedUserDTO extendedUserDTO);

    List<ExtendedUser> extendedUserDTOsToExtendedUsers(List<ExtendedUserDTO> extendedUserDTOs);
}
