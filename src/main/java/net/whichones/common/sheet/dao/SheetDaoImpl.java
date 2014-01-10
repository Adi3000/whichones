package net.whichones.common.sheet.dao;

import net.whichones.common.sheet.data.Sheet;

import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.adi3000.common.database.hibernate.session.AbstractDAO;

public class SheetDaoImpl extends AbstractDAO<Sheet> implements SheetDao {
	@Override
	public boolean isTokenUsed(String token){
		Integer totalResult = 
				((Number)createCriteria(Sheet.class)
						.add(Restrictions.eq("token", token))
						.setProjection(Projections.rowCount())
						.uniqueResult()).intValue();
		return totalResult != null && totalResult > 0;
	}

}
