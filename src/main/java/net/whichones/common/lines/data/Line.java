package net.whichones.common.lines.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jettison.json.JSONObject;
import org.hibernate.annotations.Type;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

@Entity
@Table(name="lines")
@SequenceGenerator(name = "lines_line_id_seq", sequenceName = "lines_line_id_seq", allocationSize=1)
public class Line extends AbstractDataObject implements Comparable<Line>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3369287660890190816L;
	private Integer id;
	private Integer index;
	private JSONObject data;
	private Group group;
	private Section section;
	private Boolean selected;
	/**
	 * @return the id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lines_line_id_seq")
	@Column(name="line_id")
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the index
	 */
	@Column(name="line_index")
	public Integer getIndex() {
		return index;
	}
	/**
	 * @param index the index to set
	 */
	public void setIndex(Integer index) {
		this.index = index;
	}
	/**
	 * @return the data
	 */
	@Column(name="line_data")
	@Type(type="com.adi3000.common.database.hibernate.usertype.JSONObjectUserType")
	public JSONObject getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(JSONObject data) {
		this.data = data;
	}
	/**
	 * @return the group
	 */
	@JoinColumn(name="group_id")
	public Group getGroup() {
		return group;
	}
	/**
	 * @param group the group to set
	 */
	public void setGroup(Group group) {
		this.group = group;
	}
	/**
	 * @return the section
	 */
	@JoinColumn(name="section_id")
	public Section getSection() {
		return section;
	}
	/**
	 * @param section the section to set
	 */
	public void setSection(Section section) {
		this.section = section;
	}
	/**
	 * @return the selected
	 */
	@Column(name="line_selected")
	@Type(type="yes_no")
	public Boolean getSelected() {
		return selected;
	}
	/**
	 * @param selected the selected to set
	 */
	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	@Override
	public int compareTo(Line o) {
		return this.getFullIndex() - o.getFullIndex();
	}
	@Transient
	private int getFullIndex(){
		int majorIndex = this.index;
		int mediumIndex = this.index;
		int minorIndex = this.index;
		if(section != null && section.getIndex() != null){
			majorIndex = section.getIndex();
			
			if(group != null && group.getIndex() != null){
				mediumIndex = group.getIndex() * 1000;
			}
		}else if(group != null && group.getIndex() != null){
			majorIndex = group.getIndex();
		}
		return (majorIndex * 1000 * 1000) + 
				(mediumIndex * 1000) + 
				minorIndex;
	}
}
