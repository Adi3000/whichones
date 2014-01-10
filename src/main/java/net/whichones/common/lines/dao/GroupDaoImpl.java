package net.whichones.common.lines.dao;

import org.springframework.stereotype.Repository;

import net.whichones.common.lines.data.Group;

import com.adi3000.common.database.hibernate.session.AbstractDAO;

@Repository
public class GroupDaoImpl extends AbstractDAO<Group> implements GroupDao{

	public GroupDaoImpl() {
	}

}
