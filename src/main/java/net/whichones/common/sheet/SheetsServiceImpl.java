package net.whichones.common.sheet;

import org.springframework.stereotype.Service;

import net.whichones.common.sheet.dao.SheetDao;
import net.whichones.common.sheet.data.Sheet;

import com.adi3000.common.database.hibernate.DatabaseOperation;
import com.adi3000.common.util.security.Security;

@Service
public class SheetsServiceImpl {

	private static final int GENERATE_TOKEN_MAX_TRY = 15;
	private SheetDao sheetDao;
	
	public Sheet createSheet(Sheet sheet){
		String token = null;
		boolean tokenChoosen = false;
		int i = 0;
		do{
			token = Security.generateTokenID().substring(0, 10);
			tokenChoosen = !sheetDao.isTokenUsed(token);
			i++;
		}while(!tokenChoosen && i < GENERATE_TOKEN_MAX_TRY);
		if(tokenChoosen){
			sheet.setToken(token);
			sheet.setId(null);
			sheet.setDatabaseOperation(DatabaseOperation.INSERT);
			return sheetDao.modifyDataObject(sheet);
		}else{
			return null;
		}
	}
}
